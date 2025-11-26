import {useSidebarStore} from "../store/sidebarStore.ts";
import Head from "./Head.tsx";
import Foot from "./Foot.tsx";
import StaticLinkContainer from "./StaticLinkContainer.tsx";
import StaticLink from "./StaticLink.tsx";
import {Coins, Home, PillBottle} from "lucide-react";
import DynamicLinkContainer from "./DynamicLinkContainer.tsx";
import {useUserInfoStore} from "../../../shared/store/userInfoStore.ts";

const staticLinks = [
  { link: "/", icon: Home, placeholder: "Accueil" },
  { link: "/products", icon: PillBottle, placeholder: "Produits" },
  { link: "/sales", icon: Coins, placeholder: "Achats" },
]

const Sidebar = () => {

  const closeSidebar = useSidebarStore((state) => state.closeSidebar)

  const information = useUserInfoStore(state => state.information)

  const shopName = information?.user?.role === "shop_owner" ? "MagLife" : ""

  return (
    <div className="z-20 fixed inset-0 flex md:relative shadow-xl">
      <div className="relative bg-white/10 backdrop-blur-md w-2xs px-2 pb-2 flex flex-col gap-2">
        <Head title={shopName}/>

        <StaticLinkContainer>
          { staticLinks.map((staticLink, index) => (
            <StaticLink
              key={index}
              link={staticLink.link}
              icon={staticLink.icon}
              placeholder={staticLink.placeholder}
            />
          )) }
        </StaticLinkContainer>

        <DynamicLinkContainer>
          Des lien
        </DynamicLinkContainer>

        <Foot email={information?.user?.email} role={information?.user?.role}/>

      </div>

      <div onClick={closeSidebar} className="flex-1 bg-black/40"/>
    </div>
  )
}
export default Sidebar
