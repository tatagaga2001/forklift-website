import { useState, useEffect } from 'react'
import { fetchProducts, fetchProductById, fetchUsedProducts } from '../lib/productApi'
import { products as mockProducts, getProductById as getMockById, getUsedProducts as getMockUsed } from '../data/products'

// ดึงสินค้าทั้งหมดจาก Supabase ถ้าว่างหรือ error ใช้ mock data แทน
export function useProducts() {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts({ available: true })
      .then(rows => {
        setData(rows && rows.length > 0 ? rows : mockProducts)
      })
      .catch(() => setData(mockProducts))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}

// ดึงสินค้าชิ้นเดียวตาม id
export function useProduct(id) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetchProductById(id)
      .then(row => setData(row || getMockById(id)))
      .catch(() => setData(getMockById(id)))
      .finally(() => setLoading(false))
  }, [id])

  return { data, loading }
}

// ดึงเฉพาะรถมือสอง
export function useUsedProducts() {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsedProducts()
      .then(rows => setData(rows && rows.length > 0 ? rows : getMockUsed()))
      .catch(() => setData(getMockUsed()))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}
