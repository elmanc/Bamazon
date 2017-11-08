CREATE DATABASE Bamazon;
USE Bamazon;


CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(20) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Jordan Sneakers', 'Apparel', 90.00, 100),
    ('Nike Sweatpants', 'Apparel', 30.25, 25),
    ('Addidas Shirts', 'Apparel', 29.99, 20),
    ('Fila Socks', 'Apparel', 10.50, 30),
    ('Pizza', 'Food', 8.50, 15),
    ('Cheeseburger', 'Food', 6.25, 22),
    ('Taco', 'Food', 4.25, 50),
    ('Pepsi', 'Drinks', 2.99, 90),
    ('Fruit Punch', 'Drinks', 1.75, 40),
    ('Water', 'Drinks', 1.25, 60),
