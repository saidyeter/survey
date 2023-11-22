
interface RootLayoutProps {
  children: React.ReactNode
}
export default async function SurveyLayout({ children }: RootLayoutProps) {
  return (
    <div className="container-fluid full-height w-full pr-3 pl-3 mr-auto ml-auto">
      <div className="row row-height h-[100vh] flex flex-wrap mt-0 mr-[-.75rem] ml-[-.75rem] ">
        <div className="col-lg-6 content-left bg-[#010101] max-w-full flex-grow-0 flex-shrink-0 basis-auto w-1/2 content-left-wrapper flex justify-center items-center h-full max-h-[100vh] p-16 relative  bg-gradient-to-b from-transparent to-black/50 m-auto ">
          <img src="/afis.webp"
            alt="poster"
            className="img-fluid max-h-[80vh] w-auto"
          />
        </div>

        <div className="col-lg-6 content-right flex items-center justify-center  w-1/2 p-12">
          {children}
        </div>
      </div>
    </div>
  )
}