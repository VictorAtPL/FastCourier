/**
 * Interfejs definiujacy obiekt oferta, który jest wyświetlany w tabeli podglądu ofert.
 * @author Piotr Podbielski
 * @since 0.0.3
 * @copyright Magical Solutions
 * @license Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
export interface Oferta {
  /**
   * Id oferty.
   */
  id: number;

  /**
   * Tytuł oferty.
   */
  tytul: string;

  /**
   * Miasto docelowe.
   */
  miastoDocelowe: string;

  /**
   * Cena maksymalna, której zażąda wystawiający.
   */
  cenaMaksymalna: number;

  /**
   * Login użytkownika wystawiającego ofertę.
   */
  loginUzytkownika: string;

  /**
   * Tablica z kategoriami paczek, które może przewieźć wystawiający.
   */
  kategoriePaczek: string[];

  /**
   * Tablica z rozmiarami paczek, które może przewieźć wystawiający.
   */
  rozmiaryPaczek: string[];

  /**
   * Maksymalna waga paczki, którą może przewieźć wystawiający.
   */
  maksymalnaWagaPaczki: null | number;

  /**
   * Miasto początkowe z którego wyjeżdza wystawiający.
   */
  miastoPoczatkowe: string;

  /**
   * Cena minimalna, której zażąda wystawiający.
   */
  cenaMinimalna: number;

  /**
   * Data i godzina wyjazdu wystawiającego.
   */
  dataGodzinaWyjazdu: Date;

  aktywna: boolean;

  zablokowana: boolean;

  zleceniaTransportu: any[];
}
