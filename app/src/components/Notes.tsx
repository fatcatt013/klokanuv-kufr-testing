import React from 'react';
import { RecentActivityCard } from './RecentActivityCard';

export const MockDataRecentActivityCard = {
  taskName: 'Přiřadí barvu',
  date: '16.1.2022',
  pedagog: 'Anežka Dobrá',
  note: 'Toto je popis k vypněnému úkolu, možná se to nebude vyplňovat často a tak by bylo dobré zavést nějaký obecný'
    + ' placeholder nebo nějak naznačit, že zde není žádný popis naschvál a ne omylem.',
};

export const Notes = () => {
  return <RecentActivityCard {...MockDataRecentActivityCard} />
}
