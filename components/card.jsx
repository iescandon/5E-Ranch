
export default function Card({ card, buttonText }) {
    return (
      <div className='w-[300px] h-[350px] rounded-lg shadow-lg m-4 bg-cover bg-center' style={{ backgroundImage: `url(${card.fields.file.url})` }}>
        <div className='flex flex-col h-full justify-end p-8'>
          <h4 className='text-xl font-bold pt-2 text-white pb-2 drop-shadow-md'>{card.fields.title}</h4>
          <button className="border-white border-2 text-white p-3 drop-shadow-md bg-black bg-opacity-30 uppercase">{buttonText ? buttonText : "Shop now"}</button>
        </div>
      </div>
    )
  }
  