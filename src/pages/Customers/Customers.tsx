import CustomersTable from "@/components/Costumers/CustomersTable";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/sidebar";

export default function Customers() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="flex pt-20">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <main className="flex-1 p-6">
          <CustomersTable />
        </main>
      </div>
    </div>
  );
}
