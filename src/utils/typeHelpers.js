import typesData from "../data/types.json";

const TYPE_COLORS = {
  FIRE: 'bg-red-500',
  WATER: 'bg-blue-500',
  GRASS: 'bg-green-500',
  ELECTRIC: 'bg-yellow-500',
  PSYCHIC: 'bg-pink-500',
  ICE: 'bg-cyan-400',
  DRAGON: 'bg-indigo-600',
  DARK: 'bg-gray-800',
  FAIRY: 'bg-pink-400',
  FIGHTING: 'bg-red-700',
  POISON: 'bg-purple-600',
  GROUND: 'bg-yellow-600',
  FLYING: 'bg-indigo-400',
  BUG: 'bg-lime-600',
  ROCK: 'bg-yellow-800',
  GHOST: 'bg-purple-800',
  STEEL: 'bg-gray-500',
  NORMAL: 'bg-gray-400'
};

export const getTypeColor = (typeId) => TYPE_COLORS[typeId] || 'bg-gray-500';

export const getTypeName = (typeId) => {
  const type = typesData.types.find(t => t.id === typeId);
  return type?.name || typeId;
};

export const getTypeColorAndName = (typeId) => ({
  color: getTypeColor(typeId),
  name: getTypeName(typeId)
});