import CustomerInfoForm from '@/app/dashboard/mortgages/_forms/customer-info-form'
import DemoForm from '@/components/forms/demo'
import FileUploader from '@/components/forms/elements/file-uploader'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-10 items-center justify-between p-24">
      <div className="p-4 shadow-md">
        <h2> Demo Form</h2>
        <DemoForm />
      </div>
    </main>
  )
}
