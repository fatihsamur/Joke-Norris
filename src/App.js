import React, { useEffect, useState } from 'react';
import './App.css';
import { Layout, Card, Avatar, Col, Row, Select, Button } from 'antd';

import { getCategories, getJoke } from './api';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { Option } = Select;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [joke, setJoke] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleCategoryChange = (value) => {
    setCurrentCategory(value);
    getNewJoke(value);
  };

  const getNewJoke = async (category) => {
    setLoading(true);
    const newJoke = await getJoke(category);
    setLoading(false);
    
    console.log(newJoke);
    setJoke(newJoke);
  };

  const loadCategories = async () => {
    setLoading(true);
    const categoriesFromServer = await getCategories();
    setLoading(false);
    
    console.log(categoriesFromServer);
    setCategories(categoriesFromServer);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
  <Layout className="page">
    <Header>
      <div>
        <h1 className='logo'>Joke Norris</h1>
      </div>
    </Header>
    <Content
      style={{
        padding: '50px 50px',
      }}
    >
      <Row justify="center">
        <Col span={8}>
          
          <Card style={{ width: 500, height: 300, marginTop: 16 }} loading={loading}>
            {joke
            ? (
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={joke.categories[0]}
                description={joke.value}
                cover={joke.icon_url}
              />
            ): (
              <Meta
                title="Select a category to see the joke"
              />
            )}
          </Card>
          <Select defaultValue="Select Category" style={{ width: 120 }} onChange={handleCategoryChange}>
            {categories && categories.map((category) => (
              <Option key={category} value={category}> {category} </Option>
            ))}
          </Select>
          <Button
            onClick={() => getNewJoke(currentCategory)}
            disabled={!currentCategory}
          >
            Next Joke
          </Button>
        </Col>
      </Row>
    </Content>

    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Joke Norris
    </Footer>
  </Layout>
)};
export default App;