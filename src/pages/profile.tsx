import { Avatar } from "@/components/ui";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Page } from "@/components";
import { User } from "lucide-react";
import { titilium } from "@/constants";

function Profile() {
	return (
		<Page>
			<div className="flex w-3/4 flex-col pt-4">
				<div className="flex place-content-center">
					<Avatar className="flex h-24 w-24 cursor-pointer place-content-center border-2 border-primary">
						<AvatarImage alt="Profile" />
						<AvatarFallback>
							<User className="mt-1 h-20 w-20 text-primary" />
						</AvatarFallback>
					</Avatar>
				</div>
				<div>
					<h1
						className={`${titilium.className} text-2xl text-primary`}
					>
						User Admin
					</h1>
					<p className={`${titilium.className} text-xl text-primary`}>
						Full Privileges
					</p>
					<p className={`${titilium.className} text-xl text-primary`}>
						Joined at 12/12/2012
					</p>
					<p className={`${titilium.className} text-xl text-primary`}>
						user_admin@seguradora.pt
					</p>
				</div>
			</div>
		</Page>
	);
}

export default Profile;
