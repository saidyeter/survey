
interface RootLayoutProps {
  children: React.ReactNode
}
export default async function SurveyLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full pr-3 pl-3 mr-auto ml-auto">
      <div className="h-[100vh] flex flex-wrap mt-0 mr-[-.75rem] ml-[-.75rem] ">
        <div className="hidden md:bg-[#010101] md:max-w-full md:flex-grow-0 md:flex-shrink-0 md:basis-auto md:w-1/2 md:content-left-wrapper md:flex md:justify-center md:items-center md:h-full md:max-h-[100vh] md:p-16 md:relative md:bg-gradient-to-b md:from-transparent md:to-black/50 md:m-auto ">
          <img src="/afis.webp"
            alt="poster"
            className="max-h-[80vh] w-auto"
          />
        </div>

        <div className="flex items-center justify-center w-full p-4 md:w-1/2 md:p-12 bg-[url('/afis.webp')] bg-cover md:bg-none">
          <div className="bg-muted rounded-lg w-full p-4 md:p-0 md:h-full md:w-full md:flex md:items-center md:justify-center md:bg-inherit" >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}