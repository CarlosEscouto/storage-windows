const generateId = (windows: Object): string => {
  let id = makeId()

  Object.keys(windows).filter((window: string) => {
    // todo
    if (id === window.split('#')[1]) {
      id = makeId();
    }
  });

  return id;
}


const makeId = () => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export default generateId;