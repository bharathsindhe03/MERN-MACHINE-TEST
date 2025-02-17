import Navbar from "../../components/Navbar/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-center">
          Welcome to the Admin Panel
        </h1>
      </div>
    </div>
  );
}
