"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const t = useTranslations("nav");
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get session data from Better Auth
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const getUserInitials = () => {
    if (!session?.user) return "U";
    const name = session.user.name || session.user.email || "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Logo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex">

            {/* Auth Section - Desktop */}
            {isPending ? (
              <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || "User"}
                      />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/settings">{t("settings")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-600"
                  >
                    {t("signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/auth/sign-in">{t("signIn")}</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t("menu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>{t("menu")}</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 flex flex-col space-y-4">
                {/* User Info - Mobile */}
                {session?.user && (
                  <div className="flex items-center space-x-3 rounded-lg bg-muted p-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || "User"}
                      />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">
                        {session.user.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Links - Mobile */}

                {session?.user ? (
                  <>
                    <Link
                      href="/account/settings"
                      className="block rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("settings")}
                    </Link>
                    <div className="border-t pt-4">
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        {t("signOut")}
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button
                    asChild
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/auth/sign-in">{t("signIn")}</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

