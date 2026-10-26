import { UsersRound } from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icon";
import type { ProjectCategory } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * WordPress and WooCommerce use their official marks in brand colour. CRM is a
 * kind of software, not a brand, so it keeps a neutral lucide icon.
 */
export function CategoryIcon({
  category,
  className,
}: {
  category: ProjectCategory;
  className?: string;
}) {
  if (category === "wordpress") {
    return (
      <BrandIcon slug="wordpress" colored className={cn("size-5", className)} />
    );
  }
  if (category === "woocommerce") {
    return (
      <BrandIcon
        slug="woocommerce"
        colored
        className={cn("size-5", className)}
      />
    );
  }

  return <UsersRound aria-hidden className={cn("size-5", className)} />;
}
