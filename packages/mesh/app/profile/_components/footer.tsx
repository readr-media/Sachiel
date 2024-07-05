import Footer from '@/app/_components/footer'

export default function ProfileFooter() {
  // NOTE: only shows the footer when > 768px
  return (
    <div className="hidden sm:block">
      <Footer />
    </div>
  )
}
