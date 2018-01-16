using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PaddleBehaviour : MonoBehaviour
{
    Vector3 initial;
    Rigidbody2D pad;
    BoxCollider2D coll;

    // Use this for initialization
    void Start()
    {
        pad = GetComponent<Rigidbody2D>();
        coll = GetComponent<BoxCollider2D>();
        initial = pad.transform.position;
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(KeyCode.RightArrow))
        {
            pad.transform.Translate(new Vector3(0.3f, 0, 0));
        }
        if (Input.GetKey(KeyCode.LeftArrow))
        {
            pad.transform.Translate(new Vector3(-0.3f, 0, 0));
        }
        var collisions = new Collider2D[10];
        coll.OverlapCollider(new ContactFilter2D(), collisions);

    }
}
