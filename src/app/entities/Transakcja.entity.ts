/**
 * Interfejs definiujacy obiekt oferta, który jest wyświetlany w tabeli podglądu ofert.
 * @author Piotr Podbielski
 * @since 0.0.3
 * @copyright Magical Solutions
 * @license Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
import {Oferta} from "./Oferta.entity";

export interface Transakcja {
  /**
   * Id oferty.
   */
  id: number;

  /**
   * Tytuł oferty.
   */
  dotyczyOferty: Oferta;

  /**
   * Miasto docelowe.
   */
  zlecajacyUzytkownik: string;

  /**
   * Cena maksymalna, której zażąda wystawiający.
   */
  dataZlecenia: Date;

  /**
   * Login użytkownika wystawiającego ofertę.
   */
  komentarz: string;

  /**
   * Tablica z kategoriami paczek, które może przewieźć wystawiający.
   */
  kategoriaPaczki: string;

  /**
   * Tablica z rozmiarami paczek, które może przewieźć wystawiający.
   */
  rozmiarPaczki: string;

  /**
   * Maksymalna waga paczki, którą może przewieźć wystawiający.
   */
  wagaPaczki: number;

  /**
   * Miasto początkowe z którego wyjeżdza wystawiający.
   */
  statusZlecenia: string;

}
