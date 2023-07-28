
export default function Nav({content}) {
  return (
      <section className="w-full h-[60px] md:h-[80px] lg:h-[100px] flex flex-row">
        <div className="w-1/3">
          {/* <ul className="h-full flex flex-row text-xs items-center justify-around">
            <li>
              ABOUT US
            </li>
            <li>
              BEEF
            </li>
            <li>
              CONTACT US
            </li>
          </ul> */}
        </div>
        <div className="w-1/3 flex flex-row justify-center">
          <img src={content[0].fields.logos[5].fields.file.url}  alt="" className="h-full px-3 bg-black"/>
        </div>
        <div className="w-1/3"></div>
      </section>
  )
}

