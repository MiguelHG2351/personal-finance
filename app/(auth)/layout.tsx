import Image from 'next/image'
import AuthIllustration from '@/entities/transaction/assets/login_illustration.svg'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-beige-100 px-5 py-5 lg:grid-cols-[minmax(0,600px)_1fr]">
      <section className="relative hidden min-h-[calc(100vh-40px)] overflow-hidden rounded-xl bg-grey-900 p-10 lg:flex">
        <Image
          src={AuthIllustration}
          alt="Auth Illustration"
          fill
          priority
          sizes="600px"
          className="object-cover"
        />
        <div className="relative z-10 flex h-full w-full flex-col justify-between">
          <Image src="/logo.svg" alt="Finance" width={122} height={22} />
          <div className="max-w-[480px]">
            <h1 className="mb-6 text-preset-1 font-bold text-white">
              Keep track of your money and save for your future
            </h1>
            <p className="text-preset-4 text-white">
              Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to
              savings pots easily.
            </p>
          </div>
        </div>
      </section>

      <section className="flex min-h-[calc(100vh-40px)] items-center justify-center px-0 py-8 lg:px-10">
        {children}
      </section>
    </main>
  )
}
