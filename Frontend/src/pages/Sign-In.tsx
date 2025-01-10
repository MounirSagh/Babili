import { Button } from "@/components/ui/button"
import { SignIn } from "@clerk/clerk-react"

export default function Component() {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-full justify-center max-w-[600px] flex-col gap-8 p-8 lg:p-12">
        <div className="flex items-center gap-2">
          <img src="src/assets/LOGO-Babili-3.png" alt="NeoCode Logo" className="w-24 h-auto" />     
        </div>    
        <SignIn />
      </div>
      <div className="hidden flex-1 flex-col justify-between bg-blue-900 p-12 lg:flex">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white">Discover Babili Pêche</h2>
          <p className="max-w-md text-lg text-gray-300">
          Over 22 years of experience dedicated to the sale of fishing equipment, aquaculture supplies, and all marine equipment. Our mission is service. 
          </p>
          <Button
            variant="link"
            className="group p-0 text-white hover:no-underline"
          >
            Sign In and Discover{" "}
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Button>
        </div>
        <div className="relative h-[500px]">
          {/* <Image
            src="/placeholder.svg?height=500&width=600"
            alt="FishMaster Pro 2.0 Illustration"
            className="object-contain"
            fill
          /> */}
          
        </div>
      </div>
    </div>
  )
}