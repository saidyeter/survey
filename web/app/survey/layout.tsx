import Image from "next/image"

interface RootLayoutProps {
    children: React.ReactNode
}
export default async function SurveyLayout({ children }: RootLayoutProps) {
    return (
        <div className="container-fluid full-height w-full pr-3 pl-3 mr-auto ml-auto"

        >
            <div className="row row-height h-[100vh] flex flex-wrap mt-0 mr-[-.75rem] ml-[-.75rem] ">
                <div className="col-lg-6 content-left bg-[#010101] p-0 max-w-full flex-grow-0 flex-shrink-0 basis-auto w-1/2">
                    <div className="content-left-wrapper flex justify-center items-center max-h-[100vh] pt-[60px] pr-[90px] pb-[35px] pl-[90px] relative  bg-gradient-to-b from-transparent to-black/50 ">
                        <div>
                            <figure>
                                <img src="/afis.webp" 
                                alt="poster" 
                                className="img-fluid max-h-[80vh] w-auto" 
                                />
                            </figure>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 content-right flex items-center justify-center  w-1/2 p-12">
                    {children}
                </div>
            </div>
        </div>
    )
}
// p-[60px] h-full min-h-full overflow-y-scroll flex items-center justify-center 

// return (
//     <section className="flex p-0 items-center h-full">
//         <div className="w-1/2 h-full  bg-gradient-to-r from-cyan-500 to-blue-50">
//             <Image src={'/afis.webp'} alt='poster' width={200} height={250} />
//         </div>
//         <div className="w-1/2">
//             {children}
//         </div>
//     </section>
// )