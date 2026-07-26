export type ModelCategory =
  | "animals"
  | "props"
  | "characters"
  | "vehicles";

export type ModelRecord = {
  id: string;
  index: number;
  slug: string;
  title: string;
  sourceTitle: string;
  category: ModelCategory;
  animated: boolean;
  year: number;
  thumbnail: string;
  sketchfabUrl: string;
  description: string;
  originalCreator?: string | null;
  originalSourceUrl?: string | null;
  licenseCode?: string | null;
  attributionStatus?: "pending" | "original" | "verified" | "restricted";
  redistributionAllowed?: boolean;
  downloadReady?: boolean;
  downloadCount?: number;
};

export const models: ModelRecord[] = [
  {
    id: "71ad2da73cd9409a81c8e17721fc797e",
    index: 1,
    slug: "minecraft-style-scroll",
    title: "Minecraft Style Scroll",
    sourceTitle: "Minecraft style scroll | Blockbench",
    category: "props",
    animated: false,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/71ad2da73cd9409a81c8e17721fc797e/thumbnails/65ebe0685e5941d99740c0ef47a13b36/e4c398203ffe4047a8c8418d0a3103e4.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/minecraft-style-scroll-blockbench-71ad2da73cd9409a81c8e17721fc797e",
    description: "A Minecraft-inspired voxel scroll built as a compact fantasy prop for maps, packs, or stylized game scenes.",
  },
  {
    id: "87f34d47561448429c5dbc5ce5e09cbe",
    index: 2,
    slug: "animated-deer",
    title: "Animated Deer",
    sourceTitle: "Animated Deer | Blockbench",
    category: "animals",
    animated: true,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/87f34d47561448429c5dbc5ce5e09cbe/thumbnails/f7142e2462c94a27a43da41f76e73903/702ffc860ad2442abcfc332a259c8420.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/animated-deer-blockbench-87f34d47561448429c5dbc5ce5e09cbe",
    description: "A blocky forest deer with an animation set, designed for a Minecraft-style environment.",
  },
  {
    id: "c1a03510732d4f7dbecaa43bf361e72b",
    index: 3,
    slug: "animated-evil-wolf",
    title: "Animated Evil Wolf",
    sourceTitle: "Animated Evilwolf | Blockbench",
    category: "animals",
    animated: true,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/c1a03510732d4f7dbecaa43bf361e72b/thumbnails/3c8d25dcad29418ba9b0a6fd55ba9a0e/32998fff07774257a7dd37d7bac3fe77.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/animated-evilwolf-blockbench-c1a03510732d4f7dbecaa43bf361e72b",
    description: "An animated hostile wolf concept with a chunky silhouette and Minecraft-inspired proportions.",
  },
  {
    id: "ab738f1f4cad40e795a518cb14bbd0d4",
    index: 4,
    slug: "minecraft-wooden-toolset",
    title: "Minecraft Wooden Toolset",
    sourceTitle: "Minecraft Wooden Toolset | Bockbench",
    category: "props",
    animated: false,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/ab738f1f4cad40e795a518cb14bbd0d4/thumbnails/c0b942e42c9f4447aa160ca2e617490e/c8e21094a0be4cba93cea0136d975c5c.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/minecraft-wooden-toolset-bockbench-ab738f1f4cad40e795a518cb14bbd0d4",
    description: "A small collection of wooden tools designed around the familiar Minecraft visual language.",
  },
  {
    id: "7ee252b816f54bd1bfd0ab11f5ab60c0",
    index: 5,
    slug: "animated-holland-lop",
    title: "Animated Holland Lop",
    sourceTitle: "Animated Holland Lop | Blockbench",
    category: "animals",
    animated: true,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/7ee252b816f54bd1bfd0ab11f5ab60c0/thumbnails/5496acbb6bbf40f3b5bed29eeb6ae6a0/408c1c8c3fc84123af363cb5e1f40fad.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/animated-holland-lop-blockbench-7ee252b816f54bd1bfd0ab11f5ab60c0",
    description: "A grey Holland Lop rabbit with idle, walk, look-around, eat, and death animations.",
  },
  {
    id: "92f0a5e4a7fe4bca8110d6967649623b",
    index: 6,
    slug: "minecraft-animals",
    title: "Minecraft Animals",
    sourceTitle: "Minecraft Animals | Blockbench",
    category: "animals",
    animated: false,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/92f0a5e4a7fe4bca8110d6967649623b/thumbnails/30d734670693465e847d918932de8d0b/ad9ea9430fed4fcbb2bd1a219aa7bbd7.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/minecraft-animals-blockbench-92f0a5e4a7fe4bca8110d6967649623b",
    description: "A grouped animal study exploring readable shapes at a compact voxel scale.",
  },
  {
    id: "1d2687b0091940a4bfa862de8c9ad60f",
    index: 7,
    slug: "minecraft-premium-cases",
    title: "Minecraft Premium Cases",
    sourceTitle: "Minecraft Premium Cases | Blockbench",
    category: "props",
    animated: false,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/1d2687b0091940a4bfa862de8c9ad60f/thumbnails/0b00268f36344816a0b0d17b257a271a/fc163ba39b0f43f7a8f326441e1de91e.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/minecraft-premium-cases-blockbench-1d2687b0091940a4bfa862de8c9ad60f",
    description: "A set of decorative reward cases with bold materials and a Minecraft-inspired construction.",
  },
  {
    id: "bc5bb0eeebc846c4aaea6f8421a13be9",
    index: 8,
    slug: "animated-boar",
    title: "Animated Boar",
    sourceTitle: "Animated Boar | Bloackbench",
    category: "animals",
    animated: true,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/bc5bb0eeebc846c4aaea6f8421a13be9/thumbnails/3ac3cd8b08b94496bd3a38fc75250227/f455c002853945cbb44edce8c408217d.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/animated-boar-bloackbench-bc5bb0eeebc846c4aaea6f8421a13be9",
    description: "A game-ready voxel boar concept with an animation set and strong, compact proportions.",
  },
  {
    id: "ba41f4952a664230b67aeadba181d931",
    index: 9,
    slug: "bench",
    title: "Wooden Bench",
    sourceTitle: "Bench | Blockbench",
    category: "props",
    animated: false,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/ba41f4952a664230b67aeadba181d931/thumbnails/606cbef66bbc4adc9a3d47dbd1d81720/40bbe737bd034afd8b48ddaf81fdb663.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/bench-blockbench-ba41f4952a664230b67aeadba181d931",
    description: "A compact wooden bench study built with simple Blockbench geometry and stylized textures.",
  },
  {
    id: "51ae703638ae435a9809946f59496985",
    index: 10,
    slug: "low-poly-truck",
    title: "Low Poly Truck",
    sourceTitle: "Low Poly Truck | Blockbench",
    category: "vehicles",
    animated: true,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/51ae703638ae435a9809946f59496985/thumbnails/e1ca4dcb4ae3401ab3bef8ab8844f178/b80f4433f666414e82cb2e9bb456a42c.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/low-poly-truck-blockbench-51ae703638ae435a9809946f59496985",
    description: "A low-poly truck made from a tutorial study, extended with an original animation pass.",
  },
  {
    id: "c61e2fd4865f407ea9ec602225fed9d7",
    index: 11,
    slug: "animated-mole",
    title: "Animated Mole",
    sourceTitle: "Animated Mole | Blockbench",
    category: "animals",
    animated: true,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/c61e2fd4865f407ea9ec602225fed9d7/thumbnails/f92803fe029f470b8827c081a21e0db1/27ea5b4529f54d898ffe8749606ec468.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/animated-mole-blockbench-c61e2fd4865f407ea9ec602225fed9d7",
    description: "A stylized underground creature with a compact voxel build and expressive animation.",
  },
  {
    id: "037a3233f1f74941bc7d7b9ccb520130",
    index: 12,
    slug: "brawler-moes-driller",
    title: "Brawler Moe’s Driller",
    sourceTitle: "Brawler Moe's Driller | Blockbench",
    category: "vehicles",
    animated: false,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/037a3233f1f74941bc7d7b9ccb520130/thumbnails/adab355b999e452dadd7cb70c9d0962b/00263fb893724afc9dd015e5a2738133.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/brawler-moes-driller-blockbench-037a3233f1f74941bc7d7b9ccb520130",
    description: "A fan-made drill vehicle study inspired by the Brawl Stars character Moe.",
  },
  {
    id: "a294d02f1635410f884405bc59653296",
    index: 13,
    slug: "low-poly-character",
    title: "Low Poly Character",
    sourceTitle: "Low poly character | Blockbench",
    category: "characters",
    animated: false,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/a294d02f1635410f884405bc59653296/thumbnails/80bf615a42eb411ba88966efb0c7713a/aeb68157633f48d0a81eb2824bc03410.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/low-poly-character-blockbench-a294d02f1635410f884405bc59653296",
    description: "A voxel warrior character with layered armor and a Minecraft-inspired fantasy silhouette.",
  },
  {
    id: "64cea11a77a443f785873f5a12d04c35",
    index: 14,
    slug: "animated-paper-plane",
    title: "Animated Paper Plane",
    sourceTitle: "Animated Paper plane | Blockbench",
    category: "props",
    animated: true,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/64cea11a77a443f785873f5a12d04c35/thumbnails/7b3df1cf4269497099f136de9b1c81ff/2f59e37cc0b449088d7b39ddcbd8d7c7.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/animated-paper-plane-blockbench-64cea11a77a443f785873f5a12d04c35",
    description: "A deliberately simple paper plane asset made as a minimal geometry and animation challenge.",
  },
  {
    id: "2f918cac2300481dbfe4dcf33cecc604",
    index: 15,
    slug: "laser-tag-gun",
    title: "Laser Tag Gun",
    sourceTitle: "Laser Tag Gun | Blockbench",
    category: "props",
    animated: false,
    year: 2025,
    thumbnail: "https://media.sketchfab.com/models/2f918cac2300481dbfe4dcf33cecc604/thumbnails/df0c5c3547f84fb2814d483aeb121ab7/00845d5d6eaf4354a433d7d00b8d256e.jpeg",
    sketchfabUrl: "https://sketchfab.com/3d-models/laser-tag-gun-blockbench-2f918cac2300481dbfe4dcf33cecc604",
    description: "A colorful sci-fi laser tag prop with a chunky, readable silhouette for stylized scenes.",
  },
];

export function getModel(slug: string) {
  return models.find((model) => model.slug === slug);
}
