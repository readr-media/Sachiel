import Icon from '@/components/icon'
import { CONTACT_LINKS } from '@/constants/contact'

export default function Page() {
  return (
    <main className="sm:flex sm:justify-center sm:pb-[115px] sm:pt-5 xl:py-10">
      <section className="overflow-hidden border-b-[0.5px] border-b-primary-800 border-opacity-10 bg-single-layer sm:w-articleMain sm:rounded-xl sm:border-b-0 sm:shadow-[0_0_4px_0_rgba(0,9,40,0.1),0_2px_2px_0_rgba(0,9,40,0.1)]">
        <div className="flex flex-col items-center gap-y-6 px-5 pb-5 pt-10 sm:border-b-[0.5px] sm:border-b-primary-800 sm:border-opacity-10 sm:px-10 sm:py-8">
          <Icon
            iconName="icon-readr-logoA-mobile"
            size={{ width: 176, height: 44 }}
          />
          <p className="body-3 text-primary-600">
            若有使用上的問題，請將截圖及問題描述寄至客服信箱，或撥打客服電話由專人為您服務（服務時間：星期一～星期五，10:00～18:00）
          </p>
        </div>
        <div className="px-5 sm:px-10 sm:pb-5">
          {CONTACT_LINKS.map(({ name, href, text }) => (
            <div
              className="border-b-[0.5px] border-b-primary-800 border-opacity-10 py-4 last:border-b-0"
              key={name}
            >
              <p className="subtitle-2 mb-2 text-primary-500">{name}</p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="subtitle-1 text-primary-700 hover-or-active:text-primary-500"
              >
                {text}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
