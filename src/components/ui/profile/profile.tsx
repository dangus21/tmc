import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui";
import { User } from "lucide-react";

function Profile() {
	return (
		<div className="content-center justify-self-end">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="h-8 w-8 cursor-pointer">
						<AvatarImage
							src="/placeholder.svg?height=40&width=40"
							alt="Profile"
						/>
						<AvatarFallback>
							<User className="h-6 w-6 text-sky-700" />
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Notifications</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Log out</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export { Profile };
