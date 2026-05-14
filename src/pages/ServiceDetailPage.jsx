import { useParams } from "react-router-dom"
import { getServiceBySlug } from "../data/services"

export default function ServiceDetailPage() {
  const { slug } = useParams()

  const service = getServiceBySlug(slug)

  if (!service) {
    return <div>Service not found</div>
  }

  return (
    <div className="min-h-screen pt-24 px-6">
      <h1 className="text-4xl font-bold">
        {service.name.th}
      </h1>

      <p className="mt-4 text-gray-600">
        {service.description.th}
      </p>
    </div>
  )
}