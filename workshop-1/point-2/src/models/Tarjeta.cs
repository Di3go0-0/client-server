using point_2.Enums;

namespace point_2.Models;

public class Card
{
    public CardBrand Brand { get; set; }
    public IssuingBank IssuingBank { get; set; }
    public string CardNumber { get; set; } = string.Empty;
    public string CardHolder { get; set; } = string.Empty;

    public Card() { }

    public Card(CardBrand brand, IssuingBank issuingBank, string cardNumber = "", string cardHolder = "")
    {
        Brand = brand;
        IssuingBank = issuingBank;
        CardNumber = cardNumber;
        CardHolder = cardHolder;
    }

    public bool IsValid()
    {
        return Enum.IsDefined(typeof(CardBrand), Brand) &&
               Enum.IsDefined(typeof(IssuingBank), IssuingBank);
    }
}

