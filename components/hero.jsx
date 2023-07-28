
export default function Hero({content}) {
  return (
    <section>
      <div className='relative top-0 left-0 h-[500px] md:h-[450px] lg:h-[600px]'>
        <img src={content[0].fields.otherPics[5].fields.file.url} className='h-full w-full object-cover'/>
        {/* <div className='absolute inset-0 flex flex-row items-end justify-start'> */}
        {/* <div className='absolute inset-0 flex flex-col items-center justify-center'> */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black from-40% flex flex-col items-center justify-center'>
          {/* <img src={content[0].fields.logos[7].fields.file.url} className='h-[150px] md:h-[250px] lg:h-[250px] drop-shadow-2xl'/> */}
          <p className="text-2xl md:text-4xl lg:text-5xl text-white font-extrabold text-center drop-shadow-md pb-1 md:pb-3 lg:pb-4 font-jakarta">Bringing naturally and ethically</p>
          <p className="text-2xl md:text-4xl lg:text-5xl text-white font-extrabold text-center drop-shadow-md font-jakarta ">raised beef to your table</p>
          {/* <button className="bg-yellow-400 p-3">LEARN MORE</button> */}
        </div>
        <div className="absolute inset-0 flex flex-row justify-center m-4">
        <img src={content[0].fields.logos[5].fields.file.url}  alt="" className="absolute h-[60px] lg:h-[100px]"/>
        </div>
      </div>
    </section>
  )
}