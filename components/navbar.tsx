"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, Monitor, Globe } from "lucide-react";
import { useTheme } from "next-themes";
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
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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

  const changeLanguage = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    router.push(newPath);
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
          <div className="hidden items-center space-x-2 md:flex">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">{t("toggleTheme")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>{t("light")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>{t("dark")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>{t("system")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">{t("changeLanguage")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage("en")}>
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("th")}>
                  🇹🇭 ไทย
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
                {/* Theme Toggle - Mobile */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground px-4">
                    {t("toggleTheme")}
                  </p>
                  <div className="grid grid-cols-3 gap-2 px-4">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("light")}
                      className="w-full"
                    >
                      <Sun className="mr-2 h-4 w-4" />
                      {t("light")}
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("dark")}
                      className="w-full"
                    >
                      <Moon className="mr-2 h-4 w-4" />
                      {t("dark")}
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme("system")}
                      className="w-full"
                    >
                      <Monitor className="mr-2 h-4 w-4" />
                      {t("system")}
                    </Button>
                  </div>
                </div>

                {/* Language Toggle - Mobile */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground px-4">
                    {t("changeLanguage")}
                  </p>
                  <div className="grid grid-cols-2 gap-2 px-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        changeLanguage("en");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      🇺🇸 English
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        changeLanguage("th");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      🇹🇭 ไทย
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4" />

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

