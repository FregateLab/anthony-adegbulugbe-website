export function Footer() {
  return (
    <footer className="border-t-2 border-black bg-[#f5f1e8] py-6 sm:py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs sm:text-sm">
          © {new Date().getFullYear()} PASTOR ANTHONY OLUSEGUN ADEGBULUGBE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  )
}