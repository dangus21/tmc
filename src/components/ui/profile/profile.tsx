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
import Link from "next/link";

function Profile() {
	return (
		<div className="content-center justify-self-end">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="h-8 w-8 cursor-pointer">
						<AvatarImage alt="Profile" />
						<AvatarFallback>
							<User className="h-6 w-6 text-primary" />
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<Link href="/profile">
						<DropdownMenuItem className="cursor-pointer">
							Settings
						</DropdownMenuItem>
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export { Profile };
