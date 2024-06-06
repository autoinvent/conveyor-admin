import type { ComponentProps } from 'react';
import { LucideHome, LucideBox, ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { Link, Outlet } from '@tanstack/react-router';

import { ConveyorLogo } from '@autoinvent/conveyor';

import { useConveyor } from '@/Conveyor';

export interface DashboardProps extends ComponentProps<'div'> {}

export const Dashboard = ({ ...props }: DashboardProps) => {
  const { selected: models } = useConveyor((state) => state.models);
  const { selected: rootPath } = useConveyor((state) => state.rootPath);

  return (
    <div className="h-screen w-screen bg-[--bg-color] text-[--text-color]">
      <aside
        className="group fixed inset-y-0 left-0 z-10 w-14 whitespace-nowrap border-[--fg-accent] border-r bg-[--bg-accent] text-[--text-muted] transition-[width] hover:w-fit"
        {...props}
      >
        <nav className="flex h-full flex-col gap-4 px-2 py-5">
          <div className="inline-flex cursor-default items-start gap-2 overflow-hidden rounded-md py-1 text-start font-semibold text-[--text-color] text-lg transition-colors">
            <img src={ConveyorLogo} alt="Conveyor Logo" className="h-9 w-9" />
            <span className="mt-1.5 ml-1.5 hidden group-hover:inline">
              Conveyor
            </span>
          </div>
          <hr className="border-[--fg-accent] border-t" />
          <Link
            className="inline-flex h-9 w-full items-start gap-2 overflow-hidden rounded-md py-1.5 text-start font-semibold text-lg transition-colors hover:bg-[--fg-accent] hover:text-[--text-color]"
            to={`/${rootPath}/`}
          >
            <LucideHome className="w-9" />
            <span className="ml-2 hidden group-hover:inline">Home</span>
          </Link>
          <Accordion.Root className="h-4/5" type="single" collapsible>
            <Accordion.Item className=" h-full transition-all" value="Models">
              <Accordion.Header className="flex">
                <Accordion.AccordionTrigger className="flex flex-1 items-center justify-between rounded-md border-0 px-0 py-1.5 font-semibold text-lg transition-all [&[data-state=open]>svg]:rotate-180 hover:bg-[--fg-accent] hover:text-[--text-color]">
                  <LucideBox className="w-9 transition-transform duration-200" />
                  <span className="ml-3 hidden group-hover:inline">Models</span>
                  <ChevronDown className="hidden h-4 w-4 shrink-0 transition-transform duration-200 group-hover:inline" />
                </Accordion.AccordionTrigger>
              </Accordion.Header>
              <Accordion.AccordionContent className="mt-1 hidden h-full flex-col gap-1 overflow-auto text-sm transition-all group-hover:flex data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                {Object.keys(models).map((model) => (
                  <Link
                    key={model}
                    to={`/${rootPath}/${model}`}
                    className="inline h-9 w-full rounded-md py-1.5 pr-2 pl-[52px] font-semibold text-lg hover:bg-[--fg-accent] hover:text-[--text-color]"
                  >
                    {model}
                  </Link>
                ))}
              </Accordion.AccordionContent>
            </Accordion.Item>
          </Accordion.Root>
          {/* <hr className="border-t border-[--fg-accent]" />
          <span className="py-1.5 rounded-md hover:bg-[--fg-accent] items-start transition-colors h-9 inline-flex w-full text-start gap-2 text-lg font-semibold hover:text-[--text-color] overflow-hidden">
            <LucideEclipse className="w-9" />
            <span className="ml-2 hidden group-hover:inline">Themes</span>
          </span> */}
        </nav>
      </aside>
      <div className="ml-14">
        <main className="mx-[10%] py-6 text-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
