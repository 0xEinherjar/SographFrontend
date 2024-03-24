async function uploadFile(file) {
  const data = new FormData();
  data.append("file", file);
  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_KEY_JWT}`,
      },
      body: data,
    }
  );
  const result = await response.json();
  return result.IpfsHash;
}

export async function pinProfileToIPFS(params) {
  const data = new FormData();
  let avatar = params.avatar;
  if (params.avatar instanceof File) {
    avatar = await uploadFile(params.avatar);
    avatar = `https://ipfs.io/ipfs/${avatar}`;
  }
  const json = JSON.stringify({
    avatar: avatar,
    name: params.name,
    description: params.description,
    created_at: params.createdAt,
    biography: params.biography ?? "",
    location: params.location ?? "",
    links: {
      twitter: params.links?.twitter ?? "",
      youtube: params.links?.youtube ?? "",
      twitch: params.links?.twitch ?? "",
      instagram: params.links?.instagram ?? "",
    },
  });
  const blob = new Blob([json], { type: "application/json" });
  data.append("file", blob);
  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_KEY_JWT}`,
      },
      body: data,
    }
  );
  const result = await response.json();
  return `https://ipfs.io/ipfs/${result.IpfsHash}`;
}

export async function pinPostToIPFS(params) {
  const data = new FormData();
  let attachment = null;
  if (Boolean(params.attachment)) {
    attachment = await uploadFile(params.attachment);
    attachment = `https://ipfs.io/ipfs/${attachment}`;
  }
  const json = JSON.stringify({
    attachment: attachment,
    text: params.text,
    created_at: params.createdAt,
  });
  const blob = new Blob([json], { type: "application/json" });
  data.append("file", blob);
  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PINATA_KEY_JWT}`,
      },
      body: data,
    }
  );
  const result = await response.json();
  return `https://ipfs.io/ipfs/${result.IpfsHash}`;
}
