using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Task1.Migrations
{
    /// <inheritdoc />
    public partial class SeededTwoMoreData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1245b133-cf5a-4a9d-9d08-8788d72c632c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "97e5179a-5acf-477f-8373-33181ad74f95");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "61c8f4af-5b71-4551-8915-2a45bcd900e6", null, "User", "USER" },
                    { "ec4fc128-690a-4fe8-a80f-987df0d2e112", null, "Administrator", "ADMINISTRATOR" }
                });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "CityId", "CityName", "Country", "Currency", "State" },
                values: new object[] { 4, "CALGARY", "Canada", "CAD", "Alberta" });

            migrationBuilder.InsertData(
                table: "Branches",
                columns: new[] { "Id", "Address", "BU_Codes", "Business_Hours", "CityId", "Latitude", "Longitude", "Opened_dt", "Phone", "Status" },
                values: new object[,]
                {
                    { 4, "BAY P - 2020 32nd Avenue NE", "ABCA1", "Monday - Friday 7:30am - 5:00pm", 4, 51.0, -114.0, new DateOnly(2008, 10, 9), "(403)291-3282", "Open" },
                    { 5, "Bay # 10, 711 48 th Ave. S.E.", "ABCA2", "Monday - Friday 7:30am - 5:00pm", 4, 51.0, -114.0, new DateOnly(2008, 10, 23), "(403)-258-2658", "Open" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "61c8f4af-5b71-4551-8915-2a45bcd900e6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ec4fc128-690a-4fe8-a80f-987df0d2e112");

            migrationBuilder.DeleteData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Branches",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Cities",
                keyColumn: "CityId",
                keyValue: 4);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1245b133-cf5a-4a9d-9d08-8788d72c632c", null, "User", "USER" },
                    { "97e5179a-5acf-477f-8373-33181ad74f95", null, "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
