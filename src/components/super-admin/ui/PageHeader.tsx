"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  children,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-1 font-medium">
            <Link href="/super-admin" className="hover:text-gray-700 transition-colors">
              Super Admin
            </Link>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <ChevronRight size={12} className="text-gray-300" />
                {b.href ? (
                  <Link href={b.href} className="hover:text-gray-700 transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-[#3A322B] font-bold">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-bold text-[#3A322B] tracking-tight">{title}</h1>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>

      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
};
