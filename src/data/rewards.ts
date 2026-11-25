// src/data/rewards.ts

export interface Reward {
    title: string;
    description: string;
    type: 'discount' | 'download' | 'video' | 'special';
    link?: string;
    linkText?: string;
    code?: string;
    image?: string;
}

export const rewardsData: Record<number, Reward> = {
    1: {
        title: "¡Primer día desbloqueado!",
        description: "Disfruta de un 15% de descuento exclusivo para nuestra tienda.",
        type: "discount",
        code: "ACANEO15",
        link: "https://acaneocollective.myshopify.com",
        linkText: "Ir a la tienda"
    },
    2: {
        title: "Wallpaper Exclusivo",
        description: "Descarga el fondo de pantalla oficial para tu escritorio o móvil.",
        type: "download",
        image: "/novedad-1.png",
        link: "/novedad-1.png",
        linkText: "Descargar Imagen"
    },
    3: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     4: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     5: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     6: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     7: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     8: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     9: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     10: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     11: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     12: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     13: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     14: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     15: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     16: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     17: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     18: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     19: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     20: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     21: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     22: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     23: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     24: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    },
     25: {
        title: "Backstage de Animación",
        description: "Un vistazo exclusivo al proceso de layout 3D y rigging de nuestros personajes.",
        type: "video",
        link: "https://youtube.com",
        linkText: "Ver video exclusivo"
    }
};