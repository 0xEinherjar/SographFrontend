export const usePrepare = () => {
  async function profileToCaller(data) {
    const metadataURL = data[2];
    if (!String(metadataURL).startsWith("https://ipfs.io/ipfs/")) return null;
    const metadata = await fetch(metadataURL).then((response) =>
      response.json()
    );
    let avatar = metadata.avatar;
    if (avatar != null && !avatar.startsWith("https://ipfs.io/ipfs/")) {
      avatar = null;
    }
    const publications = [];
    for (const item of data[9]) {
      publications.push(Number(String(item).replace(/n/i, "")));
    }
    return {
      avatar: avatar,
      name: metadata.name,
      description: metadata.description,
      id: String(data[0]).replace(/n/i, ""),
      owner: data[1],
      handle: data[3],
      hasSubscription: data[4],
      following: Number(String(data[5]).replace(/n/i, "")),
      followers: Number(String(data[6]).replace(/n/i, "")),
      isFollowing: data[7],
      isFollower: data[8],
      publicationsId: publications.reverse(),
      biography: metadata.biography,
      location: metadata.location,
      createdAt: metadata.created_at,
      links: {
        instagram: metadata.links.instagram,
        twitch: metadata.links.twitch,
        twitter: metadata.links.twitter,
        youtube: metadata.links.youtube,
      },
    };
  }

  async function profile(data) {
    const metadataURL = data[2];
    if (!metadataURL.startsWith("https://ipfs.io/ipfs/")) return null;
    const metadata = await fetch(metadataURL).then((response) =>
      response.json()
    );
    let avatar = metadata.avatar;
    if (avatar != null && !avatar.startsWith("https://ipfs.io/ipfs/")) {
      avatar = null;
    }
    const publications = [];
    for (const item of data[7]) {
      publications.push(Number(String(item).replace(/n/i, "")));
    }
    return {
      avatar: avatar,
      name: metadata.name,
      description: metadata.description,
      id: String(data[0]).replace(/n/i, ""),
      owner: data[1],
      handle: data[3],
      hasSubscription: data[4],
      following: Number(String(data[5]).replace(/n/i, "")),
      followers: Number(String(data[6]).replace(/n/i, "")),
      publicationsId: publications.reverse(),
      biography: metadata.biography,
      location: metadata.location,
      createdAt: metadata.created_at,
      links: {
        instagram: metadata.links.instagram,
        twitch: metadata.links.twitch,
        twitter: metadata.links.twitter,
        youtube: metadata.links.youtube,
      },
    };
  }

  async function postToCaller(data) {
    const postInfo = [];
    for (const list of data) {
      if (!list[1].startsWith("https://ipfs.io/ipfs/")) continue;
      if (!list[4].startsWith("https://ipfs.io/ipfs/")) continue;
      let author = await fetch(list[1]).then((response) => response.json());
      let metadata = await fetch(list[4]).then((response) => response.json());
      postInfo.push({
        authorHasSubscription: list[0],
        authorName: author.name,
        authorAvatar: author.avatar,
        authorHandle: list[2],
        id: String(list[3]).replace(/n/i, ""),
        attachment: metadata.attachment,
        text: metadata.text,
        createdAt: metadata.created_at,
        owner: list[5],
        totalLike: String(list[6]).replace(/n/i, ""),
        hasLiked: list[7],
      });
    }
    return postInfo;
  }

  async function post(data) {
    const postInfo = [];
    for (const list of data) {
      if (!list[1].startsWith("https://ipfs.io/ipfs/")) continue;
      if (!list[4].startsWith("https://ipfs.io/ipfs/")) continue;
      let author = await fetch(list[1]).then((response) => response.json());
      let metadata = await fetch(list[4]).then((response) => response.json());
      postInfo.push({
        authorHasSubscription: list[0],
        authorName: author.name,
        authorAvatar: author.avatar,
        authorHandle: list[2],
        id: String(list[3]).replace(/n/i, ""),
        attachment: metadata.attachment,
        text: metadata.text,
        createdAt: metadata.created_at,
        owner: list[5],
        totalLike: String(list[6]).replace(/n/i, ""),
      });
    }
    return postInfo;
  }

  return { profile, profileToCaller, post, postToCaller };
};
