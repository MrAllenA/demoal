export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (    
      <>  
    <section>
        <nav className="w-full h-12 fixed backdrop-blur-sm bg-black bg-opacity-75 border-b border-gray-700"></nav>
   
      </section>
      <div className="w-screen h-dvh pt-14  px-3 py-3 overflow-x-hidden">
              {children}
      </div>
      </>

    )
  }