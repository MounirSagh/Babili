import { Fish } from 'lucide-react'
function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Fish className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-xl font-bold">FishMaster Pro</span>
            </div>
            <div>
              <p>&copy; 2023 FishMaster Pro. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer