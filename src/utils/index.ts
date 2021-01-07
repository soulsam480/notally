import randomColor from 'randomcolor';
/**
 * @method getCookie
 * @param  name the name of the cookie
 * @returns  the value of the cookie
 */

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return parts
      .pop()!
      .split(';')
      .shift();
};

const randgen = (): string[] => {
  return randomColor({
    luminosity: 'light',
    count: 4,
  });
};

export { randgen };