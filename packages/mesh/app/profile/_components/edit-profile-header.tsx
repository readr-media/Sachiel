import Icon from '@/components/icon'
const EditProfileHeader = ({
  title,
  backToPreviousPage,
}: Readonly<{
  title: string
  backToPreviousPage: () => void
}>) => {
  return (
    <header className="hidden h-[60px] border-b bg-white px-5 sm:flex sm:border-none sm:px-5 md:px-[70px] lg:px-10">
      <div className="list-title grid grow grid-cols-3 items-center sm:flex sm:justify-start sm:gap-5">
        <button onClick={backToPreviousPage} className="hidden sm:block">
          <Icon iconName="icon-chevron-left" size="l" />
        </button>
        <p className="place-self-center">{title}</p>
      </div>
    </header>
  )
}

export default EditProfileHeader
