import { supabase } from './supabase'

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function fetchProducts(filters = {}) {
  let query = supabase
    .from('products')
    .select(`*, product_images(url, is_primary, sort_order)`)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (filters.condition)  query = query.eq('condition', filters.condition)
  if (filters.category)   query = query.eq('category', filters.category)
  if (filters.brand)      query = query.eq('brand', filters.brand)
  if (filters.available)  query = query.eq('is_available', true)

  const { data, error } = await query
  if (error) throw error
  return data.map(normalizeProduct)
}

export async function fetchProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select(`*, product_images(url, is_primary, sort_order)`)
    .eq('id', id)
    .single()
  if (error) throw error
  return normalizeProduct(data)
}

export async function fetchUsedProducts() {
  return fetchProducts({ condition: 'used', available: true })
}

// ─── Write (Admin only) ───────────────────────────────────────────────────────

export async function createProduct(productData) {
  const { images, ...rest } = productData
  const row = denormalizeProduct(rest)

  const { data, error } = await supabase
    .from('products')
    .insert(row)
    .select()
    .single()
  if (error) throw error

  // Insert images
  if (images?.length) {
    await upsertProductImages(data.id, images)
  }
  return data
}

export async function updateProduct(id, productData) {
  const { images, ...rest } = productData
  const row = denormalizeProduct(rest)
  row.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('products')
    .update(row)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error

  if (images !== undefined) {
    await upsertProductImages(id, images)
  }
  return data
}

export async function deleteProduct(id) {
  // Images cascade delete via FK
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

export async function toggleAvailability(id, isAvailable) {
  const { error } = await supabase
    .from('products')
    .update({ is_available: isAvailable, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

export async function toggleFeatured(id, isFeatured) {
  const { error } = await supabase
    .from('products')
    .update({ is_featured: isFeatured, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

// ─── Image Upload ─────────────────────────────────────────────────────────────

export async function uploadProductImage(productId, file) {
  const ext  = file.name.split('.').pop()
  const path = `${productId}/${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(path, file, { upsert: true })
  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(path)

  return publicUrl
}

export async function upsertProductImages(productId, images) {
  // Delete old
  await supabase.from('product_images').delete().eq('product_id', productId)

  if (!images.length) return

  const rows = images.map((url, i) => ({
    product_id: productId,
    url,
    is_primary: i === 0,
    sort_order: i,
  }))
  const { error } = await supabase.from('product_images').insert(rows)
  if (error) throw error
}

export async function deleteProductImage(productId, url) {
  const { error } = await supabase
    .from('product_images')
    .delete()
    .eq('product_id', productId)
    .eq('url', url)
  if (error) throw error
}

// ─── Normalizers ──────────────────────────────────────────────────────────────

function normalizeProduct(row) {
  if (!row) return null
  const images = (row.product_images || [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(i => i.url)

  return {
    id:             row.id,
    sku:            row.sku,
    category:       row.category,
    brand:          row.brand,
    model:          row.model,
    condition:      row.condition,
    year:           row.year,
    operatingHours: row.operating_hours,
    name:           { th: row.name_th, en: row.name_en },
    price:          row.price,
    rentalMonthly:  row.rental_monthly,
    isFeatured:     row.is_featured,
    isAvailable:    row.is_available,
    specs:          row.specs || {},
    features:       { th: row.features_th || [], en: row.features_en || [] },
    suitableFor:    { th: row.suitable_for_th || [], en: row.suitable_for_en || [] },
    inspection:     row.inspection,
    warranty:       row.warranty_th ? { th: row.warranty_th, en: row.warranty_en } : null,
    images:         images.length ? images : ['https://picsum.photos/seed/forklift/800/600'],
    createdAt:      row.created_at,
    updatedAt:      row.updated_at,
  }
}

function denormalizeProduct(p) {
  return {
    id:               p.id,
    sku:              p.sku,
    category:         p.category,
    brand:            p.brand,
    model:            p.model,
    condition:        p.condition,
    year:             p.year || null,
    operating_hours:  p.operatingHours || null,
    name_th:          p.name?.th || '',
    name_en:          p.name?.en || '',
    price:            p.price || null,
    rental_monthly:   p.rentalMonthly || null,
    is_featured:      p.isFeatured || false,
    is_available:     p.isAvailable !== false,
    specs:            p.specs || {},
    features_th:      p.features?.th || [],
    features_en:      p.features?.en || [],
    suitable_for_th:  p.suitableFor?.th || [],
    suitable_for_en:  p.suitableFor?.en || [],
    inspection:       p.inspection || null,
    warranty_th:      p.warranty?.th || null,
    warranty_en:      p.warranty?.en || null,
  }
}