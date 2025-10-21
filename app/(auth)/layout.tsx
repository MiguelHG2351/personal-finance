import Image from 'next/image'
import AuthIllustration from '@/entities/transaction/assets/login_illustration.svg'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-screen bg-beige-100 grid lg:grid-cols-[560px_1fr] grid-cols-1 py-5 sm:px-6 lg:px-5 max-w-[1440px] mx-auto gap-x-4">
      {/* Left section - shared between login and register */}
      <section className="relative h-full w-full bg-grey-900 rounded-xl overflow-hidden hidden lg:flex lg:flex-col">
        <div className="absolute inset-0 p-10 flex flex-col justify-between">
          <Image src="/logo.svg" alt="Logo" width={122} height={22} />
        </div>
        <Image
          src={AuthIllustration}
          alt="Auth Illustration"
          width={0}
          height={0}
          priority
          sizes="(min-width: 1024px) 500px, (min-width: 768px) 100vw, 100vw"
          className="w-full h-full"
        />
        <div className="shrink-0">
          <h1 className="text-white text-preset-1 font-bold mb-6">Keep track of your money and save for your future</h1>
          <p className="text-white text-preset-4">Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</p>
        </div>
      </section>

      {/* Right section - dynamic content (login/register forms) */}
      <section className="flex flex-col justify-center items-center">
        {children}
      </section>
    </main>
  )
}
