import GenerationChart from "./components/GenerationChart";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-white dark:bg-black">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Energy Data Dashboard
      </h1>
      <GenerationChart />
    </main>
  );
}
