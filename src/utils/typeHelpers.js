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

// Color hex por tipo, para componentes que piden un hex y no una clase de Tailwind
const TYPE_HEX = {
  FIRE: '#ee8130',
  WATER: '#6390f0',
  GRASS: '#7ac74c',
  ELECTRIC: '#f7d02c',
  PSYCHIC: '#f95587',
  ICE: '#96d9d6',
  DRAGON: '#6f35fc',
  DARK: '#705746',
  FAIRY: '#d685ad',
  FIGHTING: '#c22e28',
  POISON: '#a33ea1',
  GROUND: '#e2bf65',
  FLYING: '#a98ff3',
  BUG: '#a6b91a',
  ROCK: '#b6a136',
  GHOST: '#735797',
  STEEL: '#b7b7ce',
  NORMAL: '#a8a77a',
};

export const getTypeColor = (typeId) => TYPE_COLORS[typeId] || 'bg-gray-500';

export const getTypeHex = (typeId) => TYPE_HEX[typeId] || '#6390f0';

export const getTypeName = (typeId) => {
  const type = typesData.types.find(t => t.id === typeId);
  return type?.name || typeId;
};

export const getTypeColorAndName = (typeId) => ({
  color: getTypeColor(typeId),
  name: getTypeName(typeId)
});