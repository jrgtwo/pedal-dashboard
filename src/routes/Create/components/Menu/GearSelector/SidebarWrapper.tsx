import { SidebarProvider } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { SORT_DIRECTION, FILTER_TYPE } from "../GearSelector"

type SidebarWrapperProps = {
  children: React.ReactNode,
  handleSortClick: (direction: SORT_DIRECTION) => (event: React.MouseEvent<HTMLButtonElement>) => void,
  handleFilterClick: (type: FILTER_TYPE, secondary: string) => (event: React.MouseEvent<HTMLButtonElement>) => void,
  filterList: string[],
}

export const SidebarWrapper = ({
  children,
  handleSortClick,
  handleFilterClick,
  filterList,
}: SidebarWrapperProps) => {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="relative">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Sort</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    variant='outline'
                    onClick={handleSortClick(SORT_DIRECTION.ASC)}>A-Z</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    variant='outline'
                    onClick={handleSortClick(SORT_DIRECTION.DESC)}>Z-A</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>

          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Filter</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    key={'all'}
                    variant='outline'
                    onClick={handleFilterClick(FILTER_TYPE.ALL, FILTER_TYPE.ALL)}>All</SidebarMenuButton>
                </SidebarMenuItem>
                {
                  filterList?.map((item) => {
                    return (
                      <SidebarMenuItem key={item}>
                        <SidebarMenuButton
                          variant='outline'
                          onClick={handleFilterClick(FILTER_TYPE.TYPE, item)}>{item}</SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      {children}
    </SidebarProvider>
  )
}
