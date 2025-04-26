export default async function Home() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/tagline`);
  const tagLine = await res.text();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="mt-[-150px] text-[25vmin]">
        jenet.ai
      </div>
      <div className="text-[2.5vh] text-center" dangerouslySetInnerHTML={{ __html: tagLine }}/>
    </div>
  )
}
