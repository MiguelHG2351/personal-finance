import Image from 'next/image'
import AuthIllustration from '@/entities/transaction/assets/login_illustration.svg'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="max-h-screen h-full bg-beige-100 flex items-stretch py-5 sm:px-6 lg:px-5 max-w-[1440px] gap-x-4">
      {/* Left section - shared between login and register */}
      <section className="relative max-w-[560px] w-full bg-grey-900 rounded-xl overflow-hidden hidden lg:block">
        <div className="absolute inset-0 p-10 flex flex-col justify-between">
          <Image src="/logo.svg" alt="Logo" width={122} height={22} />

          <div>
            <h1 className="text-white text-preset-1 font-bold mb-6">Keep track of your money and save for your future</h1>
            <p className="text-white text-preset-4">Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</p>
          </div>
        </div>
        <Image
          src={AuthIllustration}
          alt="Auth Illustration"
          width={0}
          height={0}
          priority
          sizes="(min-width: 1024px) 500px, (min-width: 768px) 100vw, 100vw"
          className="w-full h-auto"
        />
      </section>
      
      {/* Right section - dynamic content (login/register forms) */}
      <section className="flex-1 shrink-0 flex flex-col justify-center items-center">
        {children}
      </section>
    </main>
  )
}