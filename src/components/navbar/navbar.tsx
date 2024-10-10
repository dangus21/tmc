import { Dropdown } from "@/components/ui";
import { Profile } from "../ui/profile";
import { titilium } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Navbar() {
	const currentPath = usePathname();
	const includesTable = currentPath !== "/profile";

	return (
		<nav className="grid h-12 w-full grid-cols-3 content-center bg-sky-700 px-2 py-1 text-white">
			<h1 className={`${titilium.className} text-2xl`}>
				<Link href="/">Seguradora S.A. &copy;</Link>
			</h1>
			<div className="content-center justify-self-center">
				{includesTable && (
					<Dropdown
						id="insurance_table_selector"
						name="insurance_table_selector"
					/>
				)}
			</div>
			<Profile />
		</nav>
	);
}

export { Navbar };
