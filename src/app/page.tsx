export default async function Home() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/tagline`);
  const tagLine = await res.text();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="mt-[-150px] text-[200px]">
        jenet.ai
      </div>
      <div className="text-[25px]" dangerouslySetInnerHTML={{ __html: tagLine }}/>
    </div>
  )
}
