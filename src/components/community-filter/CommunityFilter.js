import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { LIGHT_BLUE } from "../../styles/colors";
import CommunityFilterBtn from "./CommunityFilterBtn/CommunityFilterBtn";
import React, { useState } from "react";
import CommunityCardSmall from "../community-card/community-card-small/CommunityCardSmall";

const CommunityFilter = ({ headingList, optionList, navigation, userList }) => {
  /*read 2 arrays, 1 for headings, 1 for options, each heading will be displayed with the corresponding data in 1 view*/
  const headings = headingList;
  const options = optionList;
  const [show, setShow] = useState(false);
  const [data, setData] = useState(userList);
  const filterMaxCardsPerPage = 6;
  const [filterMaxCards, setFilterMaxCards] = useState(6);
  // const filter = {};
  const [filter, setFilter] = useState({});
  const [submitted, setSubmitted] = useState(false);

  /* start at -1 instead of 0 because i++ is put before return (in toggle function for filter btn */
  let i = -1;
  return (
    <View>
      <View style={styles.filterBtnWrapper}>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShow(!show)}
        >
          <Ionicons
            name="filter"
            size={24}
            color={LIGHT_BLUE}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      <View>
        {/* filter toggle btn */}
        {show ? (
          <View>
            {headings.map((heading) => {
              i++;
              let optionList = options[i];
              filter[heading] = [];
              return (
                <View key={heading} style={styles.filterSingleWrapper}>
                  <Text style={styles.filterText}>
                    {heading.slice(0, 1).toUpperCase() +
                      heading.slice(1, heading.length)}
                  </Text>
                  <View style={styles.optionWrapper}>
                    {optionList.map((option) => {
                      return (
                        <CommunityFilterBtn
                          key={option.index}
                          value={option.name}
                          filter={filter}
                          heading={heading}
                        />
                      );
                    })}
                  </View>
                </View>
              );
            })}
            <View style={styles.submitBtnWrapper}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => {
                  setSubmitted(true);
                  setData([]);
                  userList.map((user) => {
                    headings.map((heading) => {
                      filter[heading].map((option) => {
                        if (
                          user[heading].includes(option) ||
                          user[heading] === option
                        ) {
                          setData((prevState) => [...prevState, user]);
                        }
                      });
                    });
                  });
                  setSubmitted(false);
                }}
              >
                <Text style={styles.submitBtnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <View style={styles.communityList}>
          {data.slice(0, filterMaxCards).map((user) => {
            return (
              <CommunityCardSmall
                userID={user.index}
                name={user.name}
                picture={user.picture}
                navigation={navigation}
              />
            );
          })}
        </View>
        <View style={styles.seeMoreBtnContainer}>
          <TouchableOpacity
            onPress={() => {
              setFilterMaxCards(
                (prevState) => prevState + filterMaxCardsPerPage
              );
              console.log(filterMaxCards);
            }}
          >
            <Text style={styles.seeMoreBtn}>See more</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommunityFilter;
