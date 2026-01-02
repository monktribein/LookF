/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects:async()=> {
    return [
      {
        source:'/',
        destination:'/login',
        permanent:false
      }
    ]
  },
  images: {
    // Align with frontend allowlist to avoid Next/Image host errors when
    // admins create products with external images.
    domains: [
      'i.ibb.co',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'i5.walmartimages.com',
      '5.imimg.com',
      'www.studiosuits.com',
      'xcdn.next.co.uk',
      'i.pinimg.com',
      'cdn.shopify.com',
      'img.freepik.com',
      'www.checkcharm.com',
      'asset1.cxnmarksandspencer.com',
      'www.jiomart.com',
      'handcmediastorage.blob.core.windows.net',
      'tse4.mm.bing.net',
      'tse3.mm.bing.net',
      'tse1.mm.bing.net',
      'assets.myntassets.com',
      'tse1.explicit.bing.net',
      'tse3.explicit.bing.net',
      'tse4.explicit.bing.net',
      'www.jaipurkurti.com',
      'baginning.com',
      'www.jeffreycampbell.com',
      'www.cottontraders.com',
      'savys.pk',
      'peppermayo.co.uk',
      'd3n4hccmbcfj87.cloudfront.net',
      'www.careofcarl.com',
      'm.media-amazon.com',
    ],
  },
}

module.exports = nextConfig
