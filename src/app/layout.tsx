export const metadata = {
  title: 'Energy Data Dashboard',
  description: 'A dashboard for visualizing energy data.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body 
        className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col" 
        suppressHydrationWarning
      >
        <h1>Common to all pages</h1>
        {children}  
      </body>
    </html>
  );
}
